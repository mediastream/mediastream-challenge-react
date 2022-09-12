const setItemsDiscounts = (data, discountRules) => {
  let dataToReturn = [];
  if(typeof data === 'object'){
    // eslint-disable-next-line
    if(data.length > 0){
      // eslint-disable-next-line
      data?.map((item) => {
        let discounts = []
        /* 
          Filtro las peliculas que coincidan con el id dentro "discountRules->itemsGroupId" 
          itero los Ids por cada descuento y luego hago push al arreglo "discount".
        */
       // eslint-disable-next-line
        discountRules?.filter((discountRule) => {
            discountRule.moviesGroupId.forEach(id => {
                if(id === item.id){
                    let discount = item.price * discountRule.discount
                    discounts.push(discount);
                }
            });
        })
  
        /*
          Hago uso del arreglo "discounts" para deducir correctamente el monto a descontar
          al precio original de cada película.
        */
        if(discounts.length > 0){
          discounts.forEach((discount) => item.price = item.price - discount)
        }
      })
      console.log('Alter items Prices: ', data);
      dataToReturn = data;
    }
  }
  return dataToReturn;
}

export default setItemsDiscounts