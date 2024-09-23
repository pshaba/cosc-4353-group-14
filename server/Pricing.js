// Pricing.js
// only class created -- implementation comes later 

class Pricing {
    //initializes an empty object to hold product price
    constructor() {
        this.prices = {}; 
    }

    //method to set the price for a specific product
    setPrice(productId, price) {
        if(typeof price !== 'number' || price < 0) {
            throw new error('Price must be a non-negative number.'); 
        }

        this.prices[productId] = price; 
    }

    //method to get the price of a specific product
    getPrice(productId) {
        const price = this.prices[productId]; 
        if(price === undefined) {
            throw new Error('Product not found.'); 
        }

        return price; 
    }

    //method to get all prices
    getAllPrices() {
        return this.prices; 
    }

    //method to calculate total price for multiple products
    calculateTotalPrice(productIds) {
        let total = 0; 

        productIds.forEach(productId => {
            const price = this.getPrice(productId); 
            total += price; 
        });

        return total; 
    }
}

module.exports = Pricing; 