// Đăng ký

export const registerUser = async (data) => {
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data)
    }
    await fetch('http://localhost:9000/api/auth/register', options)
        .then(response => response.json())
        .then(data => {
            alert(data.message)
        })
}

// Đăng nhập

export const loginUser = async (data) => {
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data)
    }
    await fetch('http://localhost:9000/api/auth/login', options)
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            localStorage.setItem('token', JSON.stringify(data.data.token));
        })
}

// files imgUrl

export const upfilesInput = async (fileInput) => {

    let formData = new FormData();
    formData.append('file', fileInput)

    const options = {
        method: 'POST',
        body: formData
    }
    let imgfile
    await fetch('http://localhost:9000/api/upload/firebase', options)
        .then((response) => response.json())
        .then(data => {
            imgfile = data.data
        })

    return imgfile
}

// tao bai moi
export const createPost = async (data) => {
    let tokenJSON = localStorage.getItem('token');
    let token = JSON.parse(tokenJSON);
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(data)
    }
    await fetch('http://localhost:9000/api/posts', options)
        .then(response => response.json())
        .then(data => {
            alert(data.message);
        })
}

// cập nhật user
export const updateUser = (data) => {
    let tokenJSON = localStorage.getItem('token');
    let token = JSON.parse(tokenJSON);
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(data)
    }
    fetch('http://localhost:9000/api/auth/update/user', options)
        .then(response => response.json())
        .then(data => {
            alert(data.message);
        })
}

// them gio hang

export const createCart = async (data) => {
    let tokenJSON = localStorage.getItem('token');
    let token = JSON.parse(tokenJSON);
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(data)
    }
    await fetch('http://localhost:9000/api/cart/create', options)
        .then(response => response.json())
        .then(data => {
            alert(data.message);
        })
}

// xoa giỏ hàng

export const deleteCart = async (data) => {
    let options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    }
    await fetch('http://localhost:9000/api/cart/delete', options)
        .then(response => response.json())
        .then(data => {
            alert(data.message);
        })
}

// them yeu thich


export const createFavorite = async (data) => {
    let tokenJSON = localStorage.getItem('token');
    let token = JSON.parse(tokenJSON);
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(data)
    }
    await fetch('http://localhost:9000/api/favorite/create', options)
        .then(response => response.json())
        .then(data => {
            alert(data.message);
        })
}

// xoa giỏ hàng

export const deleteFavorite = async (data) => {
    let tokenJSON = localStorage.getItem('token');
    let token = JSON.parse(tokenJSON);
    let options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(data)
    }
    await fetch('http://localhost:9000/api/favorite/delete', options)
        .then(response => response.json())
        .then(data => {
            alert(data.message);
        })
}



