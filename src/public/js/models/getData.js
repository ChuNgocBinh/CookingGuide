// lấy thông tin user

// import { updateQueryStringParameter } from "../utils";

export const getUser = async () => {
    let tokenJSON = localStorage.getItem('token');
    let token = JSON.parse(tokenJSON);
    let user = {};

    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
    }

    await fetch('http://localhost:9000/api/auth/user', options)
        .then(response => response.json())
        .then(data => {
            user = data
        })
    return user
}

// get food

export const getFood = async (url, params) => {
    let re = Object.keys(params).map(key => `${key}=${params[key]}`)
    let urlRequest = `${url}?${re.join('&')}`
    let listFood
    await fetch(urlRequest)
        .then(response => response.json())
        .then(data => {
            listFood = data.data
        })
    return listFood
}

export const getFoodId = async (postId) => {
    let post
    await fetch(`http://localhost:9000/api/posts/${postId}`)
        .then(response => response.json())
        .then(data => {
            post = data.data;
        })
    return post
}

//gio hang

export const getCart = async () => {
    let tokenJSON = localStorage.getItem('token');
    let token = JSON.parse(tokenJSON);
    let cart

    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
    }
    await fetch('http://localhost:9000/api/cart/', options)
        .then(response => response.json())
        .then(data => {
            cart = data.data;
        })

    return cart;
}

// delete gio hang
export const deleteAllCart = async () => {
    let options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    }
    await fetch('http://localhost:9000/api/cart/delete/allcart', options)
}