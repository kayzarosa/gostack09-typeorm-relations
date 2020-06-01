import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ICustomersRepository from '@modules/customers/repositories/ICustomersRepository';
import Order from '../infra/typeorm/entities/Order';
import IOrdersRepository from '../repositories/IOrdersRepository';

interface IProduct {
  id: string;
  quantity: number;
}

interface IRequest {
  customer_id: string;
  products: IProduct[];
}

@injectable()
class CreateOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,

    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,

    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  public async execute({ customer_id, products }: IRequest): Promise<Order> {
    const customer = await this.customersRepository.findById(customer_id);

    if (!customer) {
      throw new AppError('Client not found');
    }

    const dadosProducts = await this.productsRepository.findAllById(
      products.map(product => {
        return { id: product.id };
      }),
    );

    if (dadosProducts.length !== products.length) {
      throw new AppError('Check the products on your list');
    }

    const listProducts = dadosProducts.map(dadosProduct => {
      const quantityProduct = products.filter(p => {
        return p.id === dadosProduct.id;
      })[0].quantity;

      if (dadosProduct.quantity < quantityProduct) {
        throw new AppError(
          `Product ${dadosProduct.name} has a stock of ${dadosProduct.quantity} that is less than requested ${quantityProduct}`,
        );
      }

      return {
        product_id: dadosProduct.id,
        price: dadosProduct.price,
        quantity: quantityProduct,
      };
    });

    const order = await this.ordersRepository.create({
      customer,
      products: listProducts,
    });

    await this.productsRepository.updateQuantity(products);

    return order;
  }
}

export default CreateOrderService;
