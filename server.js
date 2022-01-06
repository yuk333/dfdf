const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
const models = require('./models');
//업로드 이미지를 관리하는 스토리지 서버로 얼터를 사용학ㅆ다.
const multer = require('multer');
//이미지 파일이 오면 어디에 저장할건지
const upload = multer({
    storage:multer.diskStorage({
        destination:function(req,file,cd){
            //어디에 저장할건지 지정
            cd(null,'upload/')
        },
        filename:function(req,file,cd){
            //어떤이름으로 저장할건지 지정
            //파일에 있는 원본이름으로 저장하겠다.
            cd(null,file.originalname)
        }
    })
});

//json형식의 데이터를 처리할 수 있게 설정하는 코드
app.use(express.json());
//브라우저의 CORS이슈를 막기위해 사용하는 코드
app.use(cors());

//get방식 응답 지정
app.get('/products',async (req,res)=>{
    //get방식 쿼리 데이터 전송
    const queryString = req.query;
    console.log(queryString.id);
    console.log(queryString.name);
    res.send({
        "products":[
            {
                "id":1,
                "name":"아이방조명",
                "price":70000,
                "seller":"그린",
                "imageUrl":"image/products/product1.jpg"
            },
            {
                "id":2,
                "name":"아이방조명",
                "price":70000,
                "seller":"그린",
                "imageUrl":"image/products/product2.jpg"
            },
            {
                "id":3,
                "name":"아이방조명",
                "price":70000,
                "seller":"그린",
                "imageUrl":"image/products/product3.jpg"
            }
            
        ]
    });
})
//POST방식 응답 지정
app.post('/products', async(req,res)=>{
    const body = req.body;
    console.log(body);
    res.send('상품이 잘 등록되었습니다.');
})
//get방식 경로 파라미터 관리하기
app.get('/products/:id',async(req,res) => {
    const params = req.params;
    console.log(params);
    //하나만 찾을때는 (select할때는) findOne
    models.Product.findOne({
        //조건절
        where: {
            id:params.id
        }
    })
    .then((result)=>{
        res.send({
            product:result
        })
    })
    .catch((error)=>{
        console.error(error);
        res.send('상품조회에 문제가 생겼습니다.')
    })
})
//이미지 파일을 post요청했을 때 업로드 폴더에 이미지를 저장
app.post('/image',upload.single('image'),(req,res)=>{
    const file = req.file;
    res.send({
        imageUrl:file.path
    })
})
//설정한 app을 실행 시키기
app.listen(port, ()=>{
    console.log('그린랩프 서버가 돌아가고 있습니다.');
})