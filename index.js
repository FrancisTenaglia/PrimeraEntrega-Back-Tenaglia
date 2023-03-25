class ProductManager {
    static last_code = 0;

    constructor (){
        this.products = [];
    }

    getProducts(){
        console.log(this.products);

    } 


    addProducts(title, description, price, thumbnail, stock) {
        ProductManager.last_code = ProductManager.last_code +1;

        const new_products = {
            code: ProductManager.last_code,
            description: description,
            title: title,
            price: price,
            thumbnail: thumbnail,
            stock: stock || 1

        }
        
        this.products.push(new_products);
        
    }


} 

const manager = new ProductManager();
manager.getProducts();
manager.addProducts('producto 1','descripcion del producto 1', 1000, 'ruta', 15 )