import {join} from 'path'

module.exports= {
	viewsPath: join(__dirname, './views'),
	publicPath: join(__dirname, './public'),
	uploadsGoodsPath: join(__dirname, './public/uploads'),  // 上传的图片所放置的文件夹
	uploadsAvatarPath: join(__dirname, './public/avatar_uploads'),  // 上传的头像所放置的文件夹
	port: parseInt(process.env.PORT, 10) || 3000,   // 端口号

	secret: '123456',  // session
	maxAge: 1000 * 60 * 60 * 6  // session保存6个小时
}