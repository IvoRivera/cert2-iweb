import jquery = require("jquery");
const $: JQueryStatic = jquery;

// filtrar las listas de regiones y ciudades
var regiones: any = {
  4 : {
    name:"IV Región de Coquimbo",
    ciudades: [
        {val:401,name:"La Serena"},
        {val:402,name:"Coquimbo"},
        {val:403,name:"Ovalle"}
      ]
    },
  5: { 
    name:"V Región de Valparaíso",
    ciudades: [
        {val:501,name:"Viña del Mar"},
        {val:502,name:"Valparaíso"},
        {val:503,name:"Quilpué"}
      ]
    }     
}

$(function() {
  $.each(regiones,function(num: number,region: string) {  
    $('#region').append('<option value="'+num+'">'+region.name+'</option>'); 
  });      
  $('#region').on("change",function() {
    var br = this.value, $ciudadDrop=$("#ciudad")
    window.console && console.log(br);
    $("option:gt(0)",$ciudadDrop).remove();
    if (br) {
      $("option:eq(0)",$ciudadDrop).text("Escoja una ciudad para la "+regiones[br].name);
        
      var ciudades = regiones[br].ciudades;
      $.each(ciudades,function(_,ciudad) {
        $ciudadDrop.append('<option value="'+ciudad.val+'">'+ciudad.name+'</option>');          
      });  
    }    
    else {
      $("option:eq(0)",$ciudadDrop).text("Primero escoja una región");
      }  
  });
});


// Manejo de tags para "habilidades"
[].forEach.call(document.getElementsByClassName('tags-input'), function (el) {
  let hiddenInput = document.createElement('input'),
      mainInput = document.createElement('input'),
      tags: string[] = [];
  
  hiddenInput.setAttribute('type', 'hidden');
  hiddenInput.setAttribute('name', el.getAttribute('data-name'));

  mainInput.setAttribute('type', 'text');
  mainInput.classList.add('main-input');
  mainInput.addEventListener('input', function () {
      let enteredTags = mainInput.value.split(',');
      if (enteredTags.length > 1) {
          enteredTags.forEach(function (t) {
              let filteredTag = filterTag(t);
              if (filteredTag.length > 0)
                  addTag(filteredTag);
          });
          mainInput.value = '';
      }
  });

  mainInput.addEventListener('keydown', function (e) {
    let keyCode = e.which || e.keyCode;
    if (keyCode === 8 && mainInput.value.length === 0 && tags.length > 0) {
      removeTag(tags.length - 1);
    }

    if (keyCode === 13 && mainInput.value.length > 0 && tags.length > 0) {
          addTag(mainInput.value);
          mainInput.value ="";
    }


  });

  el.appendChild(mainInput);
  el.appendChild(hiddenInput);

  addTag('Habilidad1');

  function addTag (text: string){
      let tag: any = {
          text: text,
          element: document.createElement('span'),
      };

      tag.element.classList.add('tag');
      tag.element.textContent = tag.text;

      let closeBtn = document.createElement('span');
      closeBtn.classList.add('close');
      closeBtn.addEventListener('click', function () {
          removeTag(tags.indexOf(tag));
      });
      tag.element.appendChild(closeBtn);

      tags.push(tag);

      el.insertBefore(tag.element, mainInput);

      refreshTags();
  }

  function removeTag (index: number) {
      let tag = tags[index];
      tags.splice(index, 1);
      el.removeChild(tag.element);
      refreshTags();
  }

  function refreshTags () {
      let tagsList: string[] = [];
      tags.forEach(function (t): void {
          tagsList.push(t.text);
      });
      hiddenInput.value = tagsList.join(',');
  }

  function filterTag (tag: string) {
      return tag.replace(/[^\w -]/g, '').trim().replace(/\W+/g, '-');
  }
});




function LimpiarDatos(){
  let reset: any = document.getElementById("limpiar");
  reset.type="reset";
}

(function () {
  let reset: any = document.getElementById("limpiar");
  let nombreCompleto: any = document.getElementById("nombrecompleto");
  let telefono: any = document.getElementById("telefono");
  let opinion: any = document.getElementById("opinion");

  opinion.maxLength = "200";
  telefono.maxLength = "9";


  let campos: any = document.getElementById("campos");

  console.log(nombreCompleto.value);


  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  let forms = document.querySelectorAll('.needs-validation')
  

  reset.addEventListener("click",LimpiarDatos);

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms)
  .forEach(function (form) {
    form.addEventListener('submit', function (event:any) {
    
      if (!form.checkValidity()) {
        if(nombreCompleto.value=="") {
          campos.children[0].getElementsByClassName("invalid-feedback")[0].innerHTML="Campo requerido";
        }
      
      event.preventDefault();
      event.stopPropagation();

      }else{
      form.style.display="none";
      let mensaje:any=document.getElementById("mensaje");
      mensaje.style.display="block";


      }
      event.preventDefault();
      event.stopPropagation();
      form.classList.add('was-validated')
    }, false)
    })
  })()
