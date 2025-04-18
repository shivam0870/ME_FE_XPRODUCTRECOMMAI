# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


------------------------------------------------------REDIS-short-------------------------------------------------------------

export const getProducts = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                products : [
                    {
                        id: 1,
                        name: "Product 1",
                        price: 100
                    }
                ]
            });
        }, 2000);
    });
};


export const getProductDetail = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                products : [
                    {
                        id: 1,
                        name: "Product 1",
                        price: 100
                    }
                ]
            });
        }, 2000);
    });
};



import express from "express";
import { getProducts } from "./api/products.js";
import Redis from "ioredis";


const app = express();
export const redis = new Redis({
    host : "redis-19558.c295.ap-southeast-1-1.ec2.redns.redis-cloud.com",
    port : 19558,
    password : "H3gJcEO0lFIsLd4Qa5ap01vCbQ49pZoY"
})

redis.on("connect", () => {
    console.log("Redis connected");
})

app.get("/", (req,res) => {
    res.send("Ok");
})

app.get("/products", async (req,res) => {
//   const isExists = await redis.exists("products");
const products = await redis.get("products");
if(products){
    console.log("Get from cache");
    const products = await redis.get("products");
  return  res.json({
        products : JSON.parse(products),
    })
}

    // const products = await getProducts();
    // console.log(products.products);
    await redis.setex("products",20,  JSON.stringify(products.products));
    res.json({products});
});

app.listen(3000, () => {
    console.log("Server is running at port 3000");
});




using get and set
