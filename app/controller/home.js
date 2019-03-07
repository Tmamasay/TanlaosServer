'use strict';

const fs=require('fs');
const path=require('path');
const dayjs=require('dayjs');
const pump = require('mz-modules/pump');

const Controller = require('egg').Controller;

class HomeController extends Controller {
 //渲染首页页面
  async index() {
    // this.ctx.body = 'hi, egg';
    // console.log('2222222222222222')
    const {ctx,service}=this;
     let result= await service.utils.sql.selectSql('yx_commit_data',{
       orders: [
                ['YX_ID', 'desc']//降序
            ]
     });
     result=JSON.stringify(result.result);
      // console.log(result)
     await ctx.render('index.ejs',{
         data:JSON.parse(result),
         title:'程旭'
     });
    
  }

//渲染新闻页面
async news() {
    // this.ctx.body = 'hi, egg';
    const {ctx,service}=this;
    const body=ctx.query
    // console.log('xxxxxxxxxxxxxxxxx')
    // console.log(body)
    // await ctx.render('show.ejs');
    let options2 = {
        where: {
          YX_ID: ctx.query.YX_ID,
        } // WHERE 条件
      }
     let result= await service.utils.sql.selectSql('yx_commit_data',options2);
     result=JSON.stringify(result.result);
      // console.log(result)
     await ctx.render('show.ejs',{
         data:JSON.parse(result),
         title:'程旭'
     });
    
  }

//上传图片
  async uploadimg() {
    const {
      ctx
    } = this;
    //获取steam文件
    const stream = await ctx.getFileStream();
    //指定上传的基础目录
    const uploadBaseLoad = 'app/public/upload/';
    //生成的文件名
    const fileName = Date.now() + "" + Number.parseInt(Math.random() * 1000) + "" + path.extname(stream.filename);
    //生成文件夹
    const dirName = dayjs(Date.now()).format('YYYYMMDD');
    // 判断文件夹是否存在，不存在则直接创建文件夹
    // console.log(fs.existsSync(path.join(this.config.baseDir,uploadBaseLoad,dirName)));
    if(!fs.existsSync(path.join(this.config.baseDir,uploadBaseLoad,dirName))) fs.mkdirSync(path.join(this.config.baseDir,uploadBaseLoad,dirName));
    //生成写入路径
    const target = path.join(this.config.baseDir,uploadBaseLoad,dirName,fileName);
    //写入流的路径
    const writeStream = fs.createWriteStream(target);
    //异步写入流
    await pump(stream, writeStream);
    // console.log(ctx)
    // ctx.headers("Access-Control-Allow-Origin", "*") 
    ctx.status = 200;
    ctx.body = {
      "code": 0,
      "msg": "成功",
      "data": {
        "src": '/public/upload/'+dirName+'/'+ fileName,
        "title": fileName //可选
      }
    }

}

 //删除上传的图片,重新上传
  async delImg(){
    const { ctx}=this;
    const delBaseLoad = 'app/';
    const body=ctx.request.body.imgURLs;
    if(!body){
      return false;
    }
    // console.log(body)
    let sign;//删除标志符 false标识文件已被删除
    await body.forEach(imgURL => {
     fs.unlinkSync(path.join(this.config.baseDir,delBaseLoad,imgURL));
     sign=fs.existsSync(path.join(this.config.baseDir,delBaseLoad,imgURL))
   });
    if(!sign){
      ctx.status=200;
      ctx.body={code:1,msg:'删除成功'}
    }else{
      ctx.status=500;
      ctx.body={code:0,msg:'删除失败'}
    }

  }

//提交富文本
 async commitText(){
   const {ctx,service}=this;
   const body=ctx.request.body;
  //  console.log(body);
   Object.assign(body,{
      YX_COMMIT_TIME:new Date().toLocaleString()
    })
   const result= await service.utils.sql.writeSql(body,'yx_commit_data',false);
   if (result.result.affectedRows && result.result.affectedRows === 1) {
      ctx.status = 200;
      ctx.body = {
        code: 1,
        msg: '成功'
      }
    } else {
      ctx.status = 500;
      ctx.body = {
        code: 0,
        msg: '失败'
      }
    }
 }

 //表单提交
 async submit(){
   const {ctx,service} =this;
   const body=ctx.request.body;
   Object.assign(body,{
     time:new Date().toLocaleString()
   })
   const result=await service.utils.sql.writeSql(body,'message_data',false)
if (result.result.affectedRows && result.result.affectedRows === 1) {
      ctx.status = 200;
      ctx.body = {
        code: 1,
        msg: '成功'
      }
    } else {
      ctx.status = 500;
      ctx.body = {
        code: 0,
        msg: '失败'
      }
    }
  //  console.log(ctx.request.body);
 }

 //留言信息查询
 async selectMessage(){
   const {ctx,service}=this;
   const page = ctx.query.page - 0;
   const limit = ctx.query.limit - 0;
   const res=await service.utils.sql.selectSql('message_data',{
     // 排序方式
        limit: limit, // 返回数据量
        offset: (page - 1) * limit, // 数据偏移量
        orders: [
                ['ID', 'desc']//降序
            ]
   })
   const total=await service.utils.sql.selectSql('message_data',{
   })
   if (res.result) {
        ctx.status = 200;
        ctx.body = {
          code: 0,
          msg: '成功',
          count: total.result.length,
          data: res.result
        }
      } else {
        ctx.status = 500;
        ctx.body = {
          code: 1,
          msg: '失败'
        }
      }
 } 
 //文章管理-查询
 async selectArticle(){
  const {ctx,service}=this;
   const page = ctx.query.page - 0;
   const limit = ctx.query.limit - 0;
   const res=await service.utils.sql.selectSql('yx_commit_data',{
     // 排序方式
        limit: limit, // 返回数据量
        offset: (page - 1) * limit, // 数据偏移量
         orders: [
                ['YX_ID', 'desc']//降序
            ]
        
   })
   const total=await service.utils.sql.selectSql('yx_commit_data',{
   })
   if (res.result) {
        ctx.status = 200;
        ctx.body = {
          code: 0,
          msg: '成功',
          count: total.result.length,
          data: res.result
        }
      } else {
        ctx.status = 500;
        ctx.body = {
          code: 1,
          msg: '失败'
        }
      }
 }
 //文章删除
 async delArticle(){
   const {ctx,service}=this;
   const body=ctx.request.body;
   console.log(body);
   const result=await service.utils.sql.delSql('yx_commit_data',body);
  //  console.log(result);
   if (result.result.affectedRows && result.result.affectedRows === 1) {
      ctx.status = 200;
      ctx.body = {
        code: 1,
        msg: '成功'
      }
    } else {
      ctx.status = 500;
      ctx.body = {
        code: 0,
        msg: '失败'
      }
    }
 }

}

module.exports = HomeController;
