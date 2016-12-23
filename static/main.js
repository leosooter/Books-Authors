$(document).ready(function(){
  console.log("Main.js has loaded");
  function updateAuthors(){
    $('#authors').empty();
    $.ajax({
      url : '/authors',
      method : 'GET',
      success : function(authors){
        console.log(authors);
        //For each author
        if(authors.length > 0){
          authors.forEach(function(author){
            //Add a new author to the authors list
            var newAuthor = `<li class="author">
                              <h5>${author.firstName} ${author.lastName}</h5>
                              <ul id="${author._id}">
                              </ul>
                              <button class="show_edit_form" type="button" name="button">Edit</button>
                              <form class="edit_author" action="/authors/${author._id}/update" method="post">
                                <h4>Edit Author</h4>
                                <input type="text" name="firstName" placeholder="First Name" value="${author.firstName}">
                                <input type="text" name="lastName" placeholder="Last Name" value="${author.lastName}">
                                <input type="submit" value="Update">
                              </form>
                              <form class="delete_author" action="/authors/${author._id}/delete" method="post">
                                <input type="submit" value="Delete Author">
                              </form>
                            </li>`;
            //Add books to each author's book list
            $('#authors').append(newAuthor);
            $('.edit_author').hide();
            $('.show_edit_form').click(function(){
              $(this).siblings('.edit_author').toggle();
            })
            if (author.books.length > 0) {
                author.books.forEach(function(book){
                var newBook = `<li>${book.title}</li>`;
                $(`#${author._id}`).append(newBook);
              })
            }
            //Add an option for each author to the select-author input in the new-book form
            var newOption = `<option value="${author._id}">${author.firstName} ${author.lastName}</option>`;
            $('#select_author').append(newOption);
          });
        }

      }
    });
  }//End of updateAuthors

  updateAuthors();


  $('.add_author').submit(function(event){
    event.preventDefault();
    $.ajax({
      url : '/authors',
      method : 'POST',
      success : function(){
        updateAuthors();
      }
    })
  });

  $('.add_book').submit(function(event){
    event.preventDefault();
    console.log($('.add_book').serialize());
    $.ajax({
      url : '/books',
      method : 'POST',
      data : $('.add_book').serialize(),
      success : function(){
        updateAuthors();
      }
    })
  });

});
