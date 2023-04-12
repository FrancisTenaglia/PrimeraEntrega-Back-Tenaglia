const fs = require('fs');

class ProductManager {
    static last_id = 0;

    constructor (archivoJson){
        this.path = archivoJson;
        this.products = [];
    };

    getProducts = async (cantidad) => {
        try{
            const listaProductos = await fs.promises.readFile(this.path, 'utf-8');
            const listaProductosConv = await JSON.parse(listaProductos);
            return cantidad!==0? listaProductosConv.slice(0, parseInt(cantidad)) : listaProductosConv ;
        } catch(error){
            console.log('Se produjo un error obteniendo el producto, error: ',error);
        }
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

        try {
            await fs.promises.writeFile(this.path, JSON.stringify(this.products));
            console.log('Se agrego el producto correctamente');
        } catch(error){
            console.log('sucedio un error: ',error);
        }        
    };


    //Retorna undefined si no encuentra el producto
    getProductsById = async (id)=> {
        try{
            const products = await fs.promises.readFile(this.path, 'utf-8');
            const productsConv = await JSON.parse(products);
            const productBuscado = productsConv.find(product => product.id === id);
            return productBuscado;
        } catch(error){
            console.log('Buscando el producto con el id: ',id, ' se produjo el error: ', error);
        }
    };

    updateProduct = async(id, campo, nuevoValor) => {
        try{
            const products = await fs.promises.readFile(this.path, 'utf-8');
            const productsConv = await JSON.parse(products); 
            const indexBuscado = productsConv.findIndex(product => product.id === id);
            productsConv[indexBuscado][campo] = nuevoValor; 
            await fs.promises.writeFile(this.path, JSON.stringify(productsConv));
        } catch(error) {
            console.log('Se produjo un error al actualizar el producto con el id: ',id,' en el campo:',campo,' error: ',error);
        }
    };

    deleteProduct = async (id) => {
        try{
            const products = await fs.promises.readFile(this.path, 'utf-8')
            const productsConv = await JSON.parse(products); 
            const nuevoArrayDelete = productsConv.map(product => product.id !== id);
            await fs.promises.writeFile(this.path, JSON.stringify(nuevoArrayDelete));
        } catch (error){
            console.log('Se produjo el siguiente error al tratar de eliminar el producto',error);
        }
    };
    
};



exports.ProductManager = ProductManager;