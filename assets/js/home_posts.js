{
    // method to submit the form data for new post using AJAX
    let createPost= function(){
        let newPostform= $('#new-post-form');

        newPostform.submit(function(e){
            e.preventDefault();

            $.ajax({
                type: 'post',
                url: '/posts/create',
                data: newPostform.serialize(),
                success: function(data){
                    let newPost= newPostDom(data.data.post);
                    $('#posts-list-container>ul').prepend(newPost);
                    deletePost($(' .delete-post-button',newPost));
                },error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }

    // method to create a post in DOM
    let newPostDom= function(post){
        return $(`<li id="post-${ post._id }">
        <p>
        
           <small>
             <a class="delete-post-button" href="/posts/destroy/${ post._id }">X</a>
           </small>   
       
           ${ post.content }
     
     <br>
     <small>${ post.user.name }</small>
       </p>
    <!-- comments form -->
    <div class="post-comments">
     
        <form action="/comments/create" method="post">
           <input type="text" name="content" placeholder="Type here to add comment...">
           <input type="hidden" name="post" value="${ post._id }">
           <input type="Submit" value="Add Comment">
        </form>   
     
    
    <!-- displaying comments -->
     <div class="post-comments-list">
        <ul id="post-comments-${ post._id }">
        
        </ul>
     </div>
    </div>
    
    </li>`)
    }


    createPost();
}

// method to delete a post from DOM
let deletePost= function(deleteLink){
    $(deleteLink).click(function(e){
        e.preventDefault();

        $.ajax({
            type: 'get',
            url: $(deleteLink).prop('href'),
            success: function(data){
                $(`#post-${data.data.post_id}`).remove();
            },error: function(error){
                console.log(error.responseText);
            }
        });
    });
}