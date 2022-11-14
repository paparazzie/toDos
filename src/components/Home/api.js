
 export async function getResponse () {
    const response = await fetch('http://localhost:8000/checkList', {
        method: 'GET'
    })
  
    const data = await response.json()
    return data

 }
