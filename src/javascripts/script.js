let myform = document.getElementById('myform');
let reader = new FileReader();

myform.myfile.addEventListener('change', function (e) {
  reader.readAsText(e.target.files[0]);
  reader.addEventListener('load', function (ev) {
    let result = JSON.parse(ev.target.result);
    console.log(result);
  });
});
