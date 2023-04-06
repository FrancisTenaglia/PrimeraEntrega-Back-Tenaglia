const fs = require('fs');

class ProductManager {
    static last_id = 0;

    constructor (archivoJson){
        this.path = archivoJson;
        this.products = [];
    };

    getProducts = async () => {
        const listaProductos = await fs.promises.readFile(this.path, 'utf-8');
        const listaProductosConv = JSON.parse(listaProductos);
        return listaProductosConv;

    
    };


    addProduct = async(objProduct) => {
        ProductManager.last_id = ProductManager.last_id +1;

        const new_product = {
            id: ProductManager.last_id,
            description: objProduct.description,
            title: objProduct.title,
            price: objProduct.price,
            thumbnail: objProduct.thumbnail,
            stock: objProduct.stock || 1,
            code: objProduct.code

        }
        
        this.products.push(new_product);

        await fs.promises.writeFile(this.path, JSON.stringify(this.products));
        //console.log('si llego aca se actualizo');
        
    };


    
    getProductsById = async (id)=> {
        const products = await fs.promises.readFile(this.path, 'utf-8')
        const productsConv = JSON.parse(products);
        const productBuscado = productsConv.find(product => product.id === id);
        return productBuscado;
    
    };

    updateProduct = async(id, campo, nuevoValor) => {
        const products = await fs.promises.readFile(this.path, 'utf-8');
        const productsConv = JSON.parse(products); 
        const indexBuscado = productsConv.findIndex(product => product.id === id);
        productsConv[indexBuscado][campo] = nuevoValor; 
        await fs.promises.writeFile(this.path, JSON.stringify(productsConv));

    };

    deleteProduct = async (id) => {
        const products = await fs.promises.readFile(this.path, 'utf-8')
        const productsConv = JSON.parse(products); 
        const nuevoArrayDelete = productsConv.map(product => product.id !== id);
        await fs.promises.writeFile(this.path, JSON.stringify(nuevoArrayDelete));

    };
    
}; 

const manager = new ProductManager('./productos.json');
manager.getProducts().then( (products) => {

    console.log("ProductosViejos: ", products); 
});

manager.addProduct({
    title: 'Bicicleta' ,
    description: 'Mountainbike',
    price: 14500, 
    thumbnail: 'ruta' ,
    stock: 12 ,
    code: '123123'
});

manager.getProducts().then((products) => {
    console.log('prudoctos 2',products)
});

  //aca muestro el array completo con el producto agregado
const product = manager.getProductsById(1);

