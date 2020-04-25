const { transform } = require('camaro');

export const camaro = async (event, context) => {
  const xml = fs.readFileSync('ean.xml', 'utf-8')
  const template = {
    cache_key: '/HotelListResponse/cacheKey',
    hotels: ['//HotelSummary', {
      hotel_id: 'hotelId',
      name: 'name',
      rooms: ['RoomRateDetailsList/RoomRateDetails', {
        rates: ['RateInfos/RateInfo', {
          currency: 'ChargeableRateInfo/@currencyCode',
          non_refundable: 'boolean(nonRefundable = "true")',
          price: 'number(ChargeableRateInfo/@total)'
        }],
        room_name: 'roomDescription',
        room_type_id: 'roomTypeCode'
      }]
    }],
    session_id: '/HotelListResponse/customerSessionId'
  }

  const result = await transform(xml, template)
  console.log(result)

};