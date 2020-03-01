import Mail from '../../lib/Mail';

class OrderMail {
  get key() {
    return 'OrderMail';
  }

  async handle({ data }: any) {
    const { deliveryman, product } = data;

    await Mail.sendMail({
      to: `${deliveryman.name} <${deliveryman.email}>`,
      subject: 'Aviso de entrega',
      template: 'order',
      context: {
        deliveryman: deliveryman.name,
        product,
      },
    });
  }
}

export default new OrderMail();
