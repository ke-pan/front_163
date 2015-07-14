var data = [
    {
        text:'省/直辖市',
        value:'0',
        list:[
            {
                text:'区',
                value:'0.0',
                list:[
                    {
                        text:'路',
                        value:'0.0.0',
                        list:[]
                    }
                ]
            }
        ]
    },
    {
        text:'北京',
        value:'1',
        list:[
            {
                text:'朝阳区',
                value:'1.1',
                list:[
                    {
                        text:'朝阳路',
                        value:'1.1.1',
                        list:[]
                    }
                ]
            },
            {
                text:'西城区',
                value:'1.2',
                list:[
                    {
                        text:'西城路',
                        value:'1.2.1',
                        list:[]
                    }
                ]
            }
        ]
    },
    {
        text:'上海',
        value:'2',
        list:[
            {
                text:'黄浦区',
                value:'2.1',
                list:[
                    {
                        text:'南京路',
                        value:'2.1.1',
                        list:[]
                    }
                ]
            },
            {
                text:'长宁区',
                value:'2.2',
                list:[
                    {
                        text:'延安路',
                        value:'2.2.1',
                        list:[]
                    }
                ]
            }
        ]
    }
];

function find(item, data) {
  for(var j=0; j<data.length; j++) {
    if(data[j].value == item) {
      return data[j];
    }
  }
}

function cascade(selectList, data) {
  // console.log("cascading");
  // console.log(selectList);
  // console.log(data);
  var nextData = find(selectList[0], data);
  if(selectList.length == 1) {
    return nextData;
  } else {
    return cascade(selectList.slice(1), nextData.list);
  }
}

function genOptions(selectElement, data) {
  for (var i = selectElement.length - 1; i >= 0; i--) {
    selectElement.remove(i);
  }
  data.forEach(function(item){
    option = new Option(item.text, item.value);
    selectElement.add(option);
  });
}

window.addEventListener('load', function() {
  var select1 = document.getElementById("select1");
  var select2 = document.getElementById("select2");
  var select3 = document.getElementById("select3");

  genOptions(select1, data);
  genOptions(select2, cascade(["0"], data).list);
  genOptions(select3, cascade(["0", "0.0"], data).list);

  var selectList = [];

  select1.addEventListener("change", function(event) {
    selectList = [event.target.value]
    genOptions(select2, cascade(selectList, data).list);
    var e = new Event("change");
    select2.dispatchEvent(e);
  });

  select2.addEventListener("change", function(event) {
    selectList[1] = event.target.value;
    genOptions(select3, cascade(selectList, data).list);
  });
});
