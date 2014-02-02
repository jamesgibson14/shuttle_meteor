Handlebars.registerHelper('toArray',function(obj,options){
  result = [];
  for (var key in obj){
    result.push(_.extend(obj[key],{_id: key}));
  }
  return result;
});
Handlebars.registerHelper('toArraySorted',function(obj, sortField, options){
  var sortField = sortField;
  var result = [];
  for (var key in obj){
    if(_.has(obj[key],"searchable"))
      result.push(_.extend(obj[key],{_id: key}));
  }
  if(sortField){
    result = result.sort(function(a,b){
      return (a[sortField]-b[sortField])
    })
  }
  return result;
});
Handlebars.registerHelper('ifState',function(val,options){
  if(!this.state && val == 'default')
    return options.fn(this);
  if(this.state == val){
    return options.fn(this);
  }
});
Handlebars.registerHelper('moment',function(obj, options){
  if(obj){
    return moment(obj.hash.date).format(obj.hash.format);
  }else{
    return "Not Defined";
  }
});