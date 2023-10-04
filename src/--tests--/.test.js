import React from "react";
import { render, screen } from '@testing-library/react'
import App from "../App";

describe('App',()=>{
    beforeEach(()=>{
        fetchMock.resetMocks()
    })
})

test('renders users when API call succeeds',async()=>{
    const fakeData =[
        {
            image:"jni.png",
            name:"ABC",
            status:"alive",
            species:"human",
            gender:"male",
            location:{
                name:"vvk"
            },
            origin:{
                name:"unknown"
            }
        }
    ]
    fetchMock.mockResolvedValue({status:200,json:jest.fn(()=>fakeData)})
    render(<App/>)
    expect(screen.getByRole('heading')).toHaveTextContent('List of Users')
    expect(await screen.findByText('ABC')).toBeInTheDocument()
  
    expect(screen.queryByText('no user found')).not.toBeInTheDocument()
})
test('renders error when API call fails',async()=>{})
