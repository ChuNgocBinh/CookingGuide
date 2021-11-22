## phân tích các chức năng đầu vào.

- là khách, tôi muốn:
    + Xem bài viết của tất cả người dùng, và đánh giá của người dùng về bài post của họ.
    + Đăng ký, đăng nhập tài khoản.

- là người dùng, tôi muốn:
    + Xem bài viết của tất cả người dùng, và đánh giá của người dùng về bài post của họ.
    + Tạo bài viết mới.
    + Đánh giá, bình luận về bài post của người khác.
    + Thêm, xóa các món ăn vào danh mục yêu thích.
    + Xóa món ăn do chính mình đăng lên.

## thiết kế database

- userSchema
{
    userName: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    role: {
        type: String,
        default: 'member',
    }
}

- postSchema
{
    title: {
        type: String,
        require: true,  
    },
    description: {
        type: String,
        require: true,
    },
    content: {
        type: String,
        require: true,
    },
    likeCount: {
        type: Number,
        default: 0,
    },
    createBy: {
        type: moongoes.Types.ObjectId,
        require: true
    }
}

- commentSchema
{
    postId: {
        type: moongoes.Types.ObjectId,
        require: true
    },
    content: {
        type: String,
        require: true
    },
    createBy: {
        type: moongoes.Types.ObjectId,
        require: true
    },
    likeCount: {
        type: Number,
        default: 0,
    }
}

- favoriteSchema
{
    userId: {
        type: moongoes.Types.ObjectId,
        require: true
    },
    postId: {
        type: array,
        default: [],
    },
}
