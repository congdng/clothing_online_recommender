import React, {useState} from 'react'
import {Form, Button} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import './SearchBox.css'
const SearchBox = () => {
    const [keyword, setKeyword] = useState('')
    const history = useNavigate();
    const submitHandler = (e) =>{
        e.preventDefault()
        if(keyword.trim()){
            history(`/search/${keyword}`)
        }else{
            history('/')
        }
    }
    return (
    <div className='grid'>
        <Form onSubmit={submitHandler} className='search_bar'>
            <Form.Control
            type='text'
            name='q'
            onChange={e =>{
                setKeyword(e.target.value)
            }}
            placeholder='Input Search Keyword...'
            className='mr-sm-2 ml-sm-5'>
            </Form.Control>
            {/* <Button type='submit' variant='primary' className='p-2'>
                Search
            </Button> */}
        </Form>
    </div>
  )
}

export default SearchBox