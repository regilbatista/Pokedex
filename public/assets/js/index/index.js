$(document).ready(function() {
    
$("#poke-container").on("click", "#delete-pokemon", function(e){
        e.preventDefault();
        if(confirm("esta seguro que quieres eliminar este pokemon?")){
            $("#form-delete-pokemon").submit();
        }
})
 

$("#region-container").on("click", "#delete-region", function(e){
    e.preventDefault();
    if(confirm("esta seguro que quieres eliminar esta region?")){
        $("#form-delete-region").submit();
    }
})

$("#type-container").on("click", "#delete-type", function(e){
    e.preventDefault();
    if(confirm("esta seguro que quieres eliminar este tipo?")){
        $("#form-delete-type").submit();
    }
})

});

