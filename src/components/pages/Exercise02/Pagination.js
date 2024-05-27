import React from 'react'
import './assets/pagination.css'

const Pagination = ({page, maxPage, setPage}) => {

 const pagesPerBlock = 6
 const currentBlock = Math.ceil(page / pagesPerBlock)
 const maxBlock = Math.ceil(maxPage / pagesPerBlock)

 const arrPages = []
 const initialPage = (currentBlock - 1 ) * pagesPerBlock + 1
 const finalPage = maxBlock === currentBlock ? maxPage : currentBlock * pagesPerBlock
 for (let i = initialPage; i <= finalPage; i++) {
  arrPages.push(i)  
 }

 const handlePage = number => {
  setPage(number)
 }

 const handlePrevious = () =>{
  if (page - 1 > 0) {
    setPage(page - 1)
  }

}
  const handleNext = () => {
    if (page + 1 <= maxPage) {
      setPage(page + 1)
    }
  }


  return (
    <div className='pagination'>
     <ul className='pagination__list'>
        <li className='pagination__item page__active' onClick={handlePrevious}>&#60;</li>
        {
          arrPages.map(e => (
            <li className={`pagination__item ${page === e && 'page__active'}`} onClick={()=> handlePage(e)} key={e}>{e}</li>
          ))
        }
        <li className='pagination__item page__active' onClick={handleNext}>&#62;</li>
      </ul>
    </div>
  )
}

export default Pagination