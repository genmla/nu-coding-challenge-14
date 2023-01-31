const commentFormHandler = async (event) => {
    event.preventDefault();

    const comment = document.querySelector('#comment').value.trim();
    const URL = document.URL.split('/');
    const blogpost_id = URL[URL.length - 1];
    
    if (comment) {
        const response = await fetch('api/comments/', {
            method: 'POST',
            body: JSON.stringify({ comment, blogpost_id}), 
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/api/blogposts/' + blogpost_id);
        } else {
            alert('Failed to post comment');
        }
    }
}

document
    .querySelector('.comment-form')
    .addEventListener('submit', commentFormHandler)