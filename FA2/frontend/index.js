const host="https://universaltodolist.herokuapp.com/"
function load_cards(){
    let card_display= document.getElementById("card_display");
    let url=host+"card";
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
        };
    
    fetch(url, requestOptions)
    .then((response) => response.json())
    .then((result) => {

        if(result.success){

            console.log(result);

            let data= result.data;
            let content=""

            for(let i=0; i<data.length; i++){
                let template = `
                
                <div class="col  ratio m-3" style=" max-width:20em; --bs-aspect-ratio: 70%;">
                <div class="card red-grey-border ">
                    <!-- <div class=" ratio ratio-16x9 img-center " style="max-width:20em; overflow: hidden">
                        <img src="to_do.png" style="object-fit:cover" class="card-img-top w-100" alt="...">

                    </div> -->

                    <div class="card-body" id="card_${data[i]._id}">
                        <h5 class="card-title">${data[i].Title}</h5>
                        <p class="card-text">${data[i].Description}</p>
                            <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#update_${data[i]._id}">
                                Update
                              </button>
                              <button name="${data[i]._id}" onclick="handle_delete(this.name)" type="button" class="btn btn-danger">
                                  Delete
                              </button>
                    </div>
                </div>

            </div>

            
            <div class="modal fade" id="update_${data[i]._id}" tabindex="-1" aria-labelledby="update_${data[i]._id}Label" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="update_${data[i]._id}Label">Update ${data[i].Title}? </h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form>
                    <div class="mb-3">
                        
                      <label for="title" class="form-label">Title</label>
                      <input id="update_${data[i]._id}Title" type="text" class="form-control" style="max-width: 20em;" id="title" aria-describedby="title" maxlength="25" placeholder="25 characters max" value="${data[i].Title}" >
                      
                    </div>
                    <div class="mb-3">
                        <label for="desc">Description</label>
                        <textarea id="update_${data[i]._id}Description"  class="form-control" placeholder="100 characters max" style="max-width: 20em;" id="desc" maxlength="100" value="${data[i].Description}">${data[i].Description}</textarea>
                        
                      </div>
                    
                  </form>
                  <button id="${data[i]._id}" onclick="handle_update(this.id)" type="submit" class="btn btn-primary">Save changes</button>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
            
            `
            content+=template;

                
            }
        card_display.innerHTML=content;

        }
        else{
            alert(result.message);
        }        
            
    })
    .catch(error => alert(error));
}

function handle_update(obj){
    console.log(obj);
    let url=host+"card";

    let _id=obj;
    let title=document.getElementById(`update_${_id}Title`);
    let desc=document.getElementById(`update_${_id}Description`);
    console.log(_id,title,desc)
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
        "id": _id,
        "Title": title.value,
        "Description": desc.value
        });

        var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch(url, requestOptions)
        .then(response => response.json())
        .then(result => {
            if(result.success){
                location.reload();
            }
            else{
                alert("couldent update fuck you")
            }
        })
        .catch(error => console.log('error', error));


}

function handle_create(e){
    e.preventDefault();
    let title= document.getElementById("title");
    let desc= document.getElementById("desc");

    if(title.reportValidity() && desc.reportValidity()){
        let url=host+"card";
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        
        var raw = JSON.stringify({
          "Title": title.value,
          "Description": desc.value
        });
        
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };
        
        fetch(url, requestOptions)
          .then(response => response.json())
          .then(result => {
              if(result.success){
                  load_cards();
              }
              else{
                  alert(result.message)
              }
          })
          .catch(error => console.log('error', error));

    }
}
function handle_delete(id){
let url=host+"card";

    var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "id": id
});

var requestOptions = {
  method: 'DELETE',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch(url, requestOptions)
  .then(response => response.json())
  .then(result => {
      if(result.success){
        load_cards();
      }
      else{
          alert("some thing went wrong"+ result.message)
      }
      
  })
  .catch(error => console.log('error', error));
}


//calling functions
document.getElementById("create_btn").addEventListener("click",handle_create);
load_cards();