class ProductManager {
    static last_code = 0;

    constructor (){
        this.products = [];
    }

    getProducts(){
        return this.products;
    } 


    addProduct(title, description, price, thumbnail, stock) {
        ProductManager.last_code = ProductManager.last_code +1;

        const new_product = {
            code: ProductManager.last_code,
            description: description,
            title: title,
            price: price,
            thumbnail: thumbnail,
            stock: stock || 1

        }
        
        this.products.push(new_product);
        
    }

    getProductsById(code) {
        const product = this.products.find(product => product.code === code);
        product?  console.log('El producto es: ', product) : console.log("No se encontro el producto");
        return product;
    
    }
    
} 

const manager = new ProductManager();
const products = manager.getProducts();
console.log("Productos: ", products);
manager.addProduct('producto 1','descripcion del producto 1', 1000, 'ruta', 15 );
const products2 = manager.getProducts();
console.log("Productos: ", products2);
const product = manager.getProductsById(1);


