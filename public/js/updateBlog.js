const updateBlog = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#title').value.trim();
    const content = document.querySelector('#content').value.trim();
    const urlArray = document.URL.split('/');
    const id = urlArray[urlArray.length - 1];

    if (title && content ) {
        const response = await fetch(`api/blogposts/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ title, content }),
            headers: { 'Content-Type': 'application/json' },
        });
    
        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to update blog post');
        }
    }
}

document
    .querySelector('.update-form')
    .addEventListener('submit', updateBlog)