var siteNameInput = document.getElementById("siteName");
var siteURLInput = document.getElementById("siteURL");
var submitButton = document.getElementById("submitButton");
var bookmarkTable = document.getElementById("bookmarkTable");



var bookmarks=[]
var alreadyStored=localStorage.getItem('allbookmarks')
var isValidURL;
var PopupsHandlingFlag;
if (alreadyStored){
    bookmarks= JSON.parse(alreadyStored)
    displayBookmarks()
}


siteURLInput.addEventListener("input", updateURLBorder);
siteNameInput.addEventListener("input", updateSiteNameBorder);





function addBookmark() {
    var bookmark = { name: siteNameInput.value, url: siteURLInput.value };
    validationPopupsHandling(bookmark)
    if ( ! PopupsHandlingFlag){
        
        bookmarks.push(bookmark);
        
        localStorage.setItem("allbookmarks", JSON.stringify(bookmarks));
        
        displayBookmarks();
        console.log(bookmarks);
        clearUI()
    }
    

}


function clearUI() {
    siteNameInput.value=null
    siteURLInput.value=null
    siteURLInput.style.borderColor = ""; 
    siteURLInput.style.boxShadow = "";
    siteNameInput.style.borderColor = ""; 
    siteNameInput.style.boxShadow = "";  

    
}

// // retrieve bookmarks in the table
function displayBookmarks() {
var cartona=``
bookmarkTable.innerHTML = ""; 

for (var index = 0; index < bookmarks.length; index++) {
    var bookmark = bookmarks[index]; 
    cartona +=` 
      <tr>
        <td>${index + 1}</td>
        <td>${bookmark.name}</td>
        <td>
        <button class="btn btn-sm btn-outline-success btn-visit" onclick="window.open('${bookmark.url}', '_blank')">Visit</button> 
        </td>
        <td>
          <button class="btn btn-sm btn-outline-danger" onclick="deleteBookmark(${index})">Delete</button>
        </td>
      </tr>`
    ;
    bookmarkTable.innerHTML = cartona;
}
}

// Delete a bookmark
function deleteBookmark(index) {
  bookmarks.splice(index, 1);
  localStorage.setItem("allbookmarks", JSON.stringify(bookmarks));
  displayBookmarks();
}


function validationPopupsHandling(bookmark) {
    PopupsHandlingFlag=false
    if (! isValidURL){
        PopupsHandlingFlag=true
        swalHelper("URL is not valid");
    }else{
        if (bookmark.name.length < 3) {
            PopupsHandlingFlag=true
            swalHelper("Bookmark name is too short");
        }else{
            for (var index = 0; index < bookmarks.length; index++) { 
                if (bookmarks[index].name === bookmark.name) {
                    PopupsHandlingFlag=true
                    swalHelper("Bookmark name already exists");
                }
        }  }
    }
    
    function swalHelper(text) {
    var str=`Bookmark names must be unique\n\nBookmark names must be at least 3 letters\n\nSite URL must be a valid URL`;
        Swal.fire({
            title: "Sorry...",
            text: text,
            icon: "error",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "show me url rules",
            cancelButtonText: "ignore",
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire({
                title: "Input Rules",
                html: '<pre>' + str + '</pre>',
                icon: "info"
              });
            }
          })
    }
    


    
    
}




function updateURLBorder() {
    isValidURL = validateURL(siteURLInput.value);
    if (isValidURL) {
        siteURLInput.style.borderColor = "green"; 
        siteURLInput.style.boxShadow = "0 0 10px 5px rgba(0, 255, 0, 0.3)";
    } else {
        siteURLInput.style.borderColor = "red";
        siteURLInput.style.boxShadow = "0 0 10px 5px rgba(255, 0, 0, 0.3)"; 
    }
}

function updateSiteNameBorder() {
    if (siteNameInput.value.length >= 3) {
        siteNameInput.style.borderColor = "green"; 
        siteNameInput.style.boxShadow = "0 0 10px 5px rgba(0, 255, 0, 0.3)";
    } else {
        siteNameInput.style.borderColor = "red";
        siteNameInput.style.boxShadow = "0 0 10px 5px rgba(255, 0, 0, 0.3)"; 
    }
}




// URL validation function
function validateURL(url) {
    var pattern = new RegExp(
        "^(https?:\\/\\/)?" + 
        "([a-zA-Z0-9\\-]+\\.)+[a-zA-Z]{2,}" + 
        "(\\:\\d+)?(\\/[-a-zA-Z0-9@:%_+.~#?&//=]*)?$", 
        "i"
    );
    
    return pattern.test(url); 
}