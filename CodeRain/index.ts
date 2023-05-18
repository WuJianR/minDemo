// 获取画布对象
let canvas: HTMLCanvasElement = document.querySelector('canvas') 
// 创建context对象
// getContext('2d')对象是内建的HTML5对象，拥有多种绘制路径、矩形、圆形、字符以及添加图像的方法
let ctx = canvas.getContext('2d')
// 设置画布对象的宽高
canvas.width = screen.availWidth  // 屏幕的可用宽度
canvas.height = screen.availHeight  // 屏幕的可用高度

// 定义代码雨落下的字符串
let str: string = 'XMZSWZS010101'
// 申请 画布对象的宽度除以10取整后得到的 长度的数组空间，并填充0
let Arr = Array(Math.ceil(canvas.width / 10)).fill(0)
// console.log(Arr);

const rain = () => {
    // fillStyle()方法用来填充绘制图形的颜色，还有实现颜色渐变及填充图像
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
    // fillRect()方法定义矩阵当前的填充方式
    // ctx.fillRect(0, 0, 150, 200)表示在画布上绘制150*200的矩形，从左上角(0,0)开始
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = '#0f0'
    Arr.forEach((item, index) => {
        // 填充文本
        ctx.fillText(str[Math.floor(Math.random() * str.length)], index * 10, item + 10)
        Arr[index] = item > canvas.height || item > 10000 * Math.random() ? 0 : item + 10
    })
}

setInterval(rain, 40)
