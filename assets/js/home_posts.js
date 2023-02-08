{
    // method to submit the form data for new post using AJAX
    console.log('jai ho');
    let createPost= function(){
        let newPostform= $('#new-post-form');

        newPostform.submit(function(e){
            e.preventDefault();

            $.ajax({
                type: 'post',
                url: '/posts/create',
                data: newPostform.serialize(),
                success: function(data){
                    console.log(data);
                },error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }

    // method to create a post in DOM


    createPost();
}