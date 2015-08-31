(function() {

    var courseURL = {
        pageNo: '1',
        psize: '20',
        type: '10',
        url: 'http://study.163.com/webDev/couresByCategory.htm',
        urlWithParams: function() {
            return this.url + '?pageNo=' + this.pageNo + '&psize=' +
                this.psize + '&type=' + this.type;
        }
    };
    var pagination = document.getElementById('pagination');
    var nextPage = pagination.getElementsByClassName('next')[0];
    var previousPage = pagination.getElementsByClassName('prev')[0];
    var mask = document.getElementById('mask');
    var login = document.getElementById('login');
    var follow = document.getElementById('follow');
    var followed = document.getElementById('followed');
    var currentPage, totalPage;

    function slideEasein(slide) {
        slide.style.opacity = 0;
        slide.style.display = 'block';
        var intervalID = setInterval(function() {
            var opacity = parseFloat(slide.style.opacity);
            slide.style.opacity = opacity + 0.1;
            if (opacity >= 0.9) {
                clearInterval(intervalID);
            }
        }, 50);
    }

    function slideShow() {
        var bannerFrame = document.getElementById('banners');
        var banners = bannerFrame.getElementsByClassName('banners');
        var icons = bannerFrame.getElementsByClassName('icons');
        var i = 0;
        var num = banners.length;
        var intervalID;
        var slideStart = function() {
            intervalID = setInterval(function() {
                hide(banners[i]);
                i = (i + 1) % num;
                slideEasein(banners[i]);
                removeClass(icons, 'active');
                addClass(icons[i], 'active');
            }, 5000);
        };
        var _banners = document.getElementById('banners');
        _banners.addEventListener('mouseenter', function() {
            clearInterval(intervalID)
        });
        _banners.addEventListener('mouseleave', slideStart);
        _banners.addEventListener('click', slideStart);
        slideStart();
    }

    function tagsChange() {
        var tags = document.getElementById('tags').getElementsByTagName(
            'h1');
        for (var i = 0; i < tags.length; i++) {
            (function(n) {
                tags[n].addEventListener('click', function() {
                    if (haveClass(tags[n], 'active')) {
                        return;
                    }
                    removeClass(tags, 'active');
                    addClass(tags[n], 'active');
                    courseURL.type = n + 1 + '0';
                    jumpToPage(1);
                });
            })(i)
        }
    }

    function createHotCoursesDOM(jsonLiked) {
        var jsons = JSON.parse(jsonLiked);
        var hotCourses = document.getElementById('hot-courses');
        for (var i = 0; i < jsons.length && i < 10; i++) {
            var li = document.createElement('li');

            var imgDiv = document.createElement('div');
            imgDiv.style.background = "url(" + jsons[i].smallPhotoUrl + ")";
            li.appendChild(imgDiv);

            var h2 = document.createElement('h2');
            var title = document.createTextNode(jsons[i].name);
            h2.appendChild(title);
            li.appendChild(h2);

            var p = document.createElement('p');
            var learnerCount = document.createTextNode(jsons[i].learnerCount);
            p.appendChild(learnerCount);
            li.appendChild(p);

            hotCourses.appendChild(li);
        }

        // change one hot courses every 5 seconds
        var lis = hotCourses.getElementsByTagName('li');
        setInterval(function() {
            var j = i % 10;
            lis[j].getElementsByTagName('div')[0].style.background =
                "url(" + jsons[i].smallPhotoUrl + ")";
            lis[j].getElementsByTagName('h2')[0].textContent =
                jsons[i].name;
            lis[j].getElementsByTagName('p')[0].textContent =
                jsons[i].learnerCount;
            i = (i + 1) % jsons.length;
        }, 5000);
    }

    function createCoursesDOM(json) {
        var courses = document.getElementById('contents');
        var list = courses.getElementsByTagName('ul')[0];
        courses.removeChild(list);
        list = document.createElement('ul');
        for (var i = 0; i < json.list.length; i++) {
            var li = document.createElement('li');
            var img = document.createElement('img');
            img.src = json.list[i].bigPhotoUrl;
            img.alt = json.list[i].name;
            img.height = '124';
            img.width = '224';
            li.appendChild(img);

            var h2 = document.createElement('h2');
            var title = document.createTextNode(json.list[i].name);
            h2.appendChild(title);
            li.appendChild(h2);

            var p1 = document.createElement('p');
            var provider = document.createTextNode(json.list[i].provider);
            p1.appendChild(provider);
            li.appendChild(p1);

            var p2 = document.createElement('p');
            var learnerCount = document.createTextNode(json.list[i].learnerCount);
            p2.appendChild(learnerCount);
            li.appendChild(p2);

            var p3 = document.createElement('p');
            var price = json.list[i].price == '0' ? '免费' :
                '￥ ' + json.list[i].price;
            p3.appendChild(document.createTextNode(price));
            li.appendChild(p3);

            var p4 = document.createElement('p');
            var description = document.createTextNode(json.list[i].description);
            p4.appendChild(description);
            li.appendChild(p4);

            var p5 = document.createElement('p');
            var categoryNameText =
                json.list[i].categoryName ? json.list[i].categoryName : '';
            var categoryName = document.createTextNode(categoryNameText);
            p5.appendChild(categoryName);
            li.appendChild(p5);

            list.appendChild(li);
        }
        courses.appendChild(list);
    }

    function drawPagination(json) {
        currentPage = json.pagination.pageIndex;
        totalPage = json.pagination.totlePageCount;
        var pages = pagination.getElementsByClassName('page')[0];
        pagination.removeChild(pages);
        pages = document.createElement('div');
        pages.className = 'page';
        for (var i = 1; i < totalPage + 1; i++) {
            var div = document.createElement('div');
            if (i == currentPage) {
                div.className = 'active';
            }
            div.textContent = i;
            pages.appendChild(div);
        }
        pagination.insertBefore(pages, nextPage);
    }

    function jumpToPage(n) {
        courseURL.pageNo = n;
        AjaxGet(courseURL.urlWithParams(), function(r) {
            var json = JSON.parse(r);
            createCoursesDOM(json);
            drawPagination(json);
        });
    }

    function bindPage() {
        pagination.addEventListener('click', function(e) {
            if (e.target.className == 'prev') {
                if (currentPage > 1) {
                    jumpToPage(currentPage - 1)
                }
            }
            else if (e.target.className == 'next') {
                if (currentPage < totalPage) {
                    jumpToPage(currentPage + 1)
                }
            }
            else if (e.target.className == '') {
                jumpToPage(e.target.textContent);
            }
        });
    }

    function loadCourses() {
        jumpToPage(1)
    }

    function loadHotCourses() {
        AjaxGet('http://study.163.com/webDev/hotcouresByCategory.htm',
            function(response) {
                createHotCoursesDOM(response);
            });
    }

    function bindIntroPlay() {
        var introImg =
            document.getElementById('intro').getElementsByTagName('img')[0];
        var playButton = document.getElementById('play');
        var videoFrame = document.getElementById('video-frame');
        var video = videoFrame.getElementsByTagName('video')[0];
        introImg.addEventListener('mouseenter', function() {
            show(playButton);
        });
        playButton.addEventListener('mouseleave', function() {
            hide(playButton);
        });
        playButton.addEventListener('click', function() {
            hide(this);
            show(mask);
            show(videoFrame);
            video.play();
        });

        var videoCloseBtn =
            videoFrame.getElementsByClassName('close-btn')[0];
        videoCloseBtn.addEventListener('click', function() {
            video.pause();
            hide(videoFrame);
            hide(mask);
        });
    }

    function bindNotice() {
        var notice = document.getElementById('notice');
        var noticeClose = notice.getElementsByClassName('right')[0];
        if (!getCookie('notice_closed')) {
            show(notice);
        }
        noticeClose.addEventListener('click', function() {
            hide(notice);
            setCookie('notice_closed', '1');
        });
    }

    function doFollow() {
        AjaxGet('http://study.163.com/webDev/attention.htm', function(r) {
            if (r === '1') {
                setCookie('followSuc', '1');
                hide(follow);
                show(followed);
            }
        });
    }

    function bindFollow() {
        if (getCookie('followSuc')) {
            hide(follow);
        }
        follow.addEventListener('click', function() {
            if (!getCookie('loginSuc')) {
                show(mask);
                show(login);
            }
            else {
                doFollow();
            }
        });

    }

    function bindFollowed() {
        var unfollow = followed.getElementsByTagName('span')[0];
        if (getCookie('followSuc')) {
            show(followed);
        }
        unfollow.addEventListener('click', function() {
            hide(followed);
            show(follow);
            setCookie('followSuc', '');
        });
    }

    // login form
    function bindLogin() {
        var loginButton = login.getElementsByTagName('button')[0];
        loginButton.addEventListener('click', function() {
            var inputs = login.getElementsByTagName('input');
            var userName = MD5(inputs[0].value);
            var password = MD5(inputs[1].value);
            // login
            AjaxGet(
                'http://study.163.com/webDev/login.htm?userName=' +
                userName + '&password=' + password,
                function(response) {
                    if (response === '1') {
                        setCookie('loginSuc', '1');
                        doFollow();
                    }
                    hide(mask);
                    hide(login);
                });
        });

        var loginClose = login.getElementsByClassName('close-btn')[0];
        loginClose.addEventListener('click', function() {
            hide(login);
            hide(mask);
        });
    }

    function cardHover() {
        var contents = document.getElementById('contents');
        var card = document.getElementById('course-card');
        contents.addEventListener('mouseover', function(e) {
            if (e.target.tagName == 'LI') {
                // img src
                card.children[0].src = e.target.children[0].src;
                // title
                card.children[1].children[0].textContent =
                    e.target.children[1].textContent;
                // learner count
                card.children[1].children[1].textContent =
                    e.target.children[3].textContent + '人在学';
                // provider
                card.children[1].children[2].textContent =
                    '发布者：' + e.target.children[2].textContent;
                // type
                card.children[1].children[3].textContent =
                    '分类：' + e.target.children[6].textContent;
                // description
                card.children[2].textContent =
                    e.target.children[5].textContent;
                card.style.top = e.target.offsetTop - 11 + 'px';
                card.style.left = e.target.offsetLeft - 10 + 'px';
                show(card);
            }
        });

        card.addEventListener('mouseleave', function() {
            hide(this);
        });
    }

    addLoadEvent(bindNotice);
    addLoadEvent(bindFollowed);
    addLoadEvent(bindFollow);
    addLoadEvent(loadCourses);
    addLoadEvent(loadHotCourses);
    addLoadEvent(slideShow);
    addLoadEvent(tagsChange);
    addLoadEvent(bindPage);
    addLoadEvent(bindIntroPlay);
    addLoadEvent(bindLogin);
    addLoadEvent(cardHover);
})();
