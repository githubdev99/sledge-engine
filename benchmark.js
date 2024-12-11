const urlQuery = `?locale=en&user=%7B%22id%22%3A%22%22%2C%22email%22%3A%22%22%2C%22name%22%3A%22%22%2C%22anonym%22%3A%22Anonymous_1718866443957%22%7D&NmIxMTNlYTVlM=U2FsdGVkX19ccww6fIZLnioAk0cCX0z%2Fe%2FVSz7o8AVfswjUlWGTDcTikgPppcXkg&zbNTHXQpW7OmI=MWQ3ZTczNzYxNDk4MGE1Y2IzZGQ4ZDhiY2NhZDk4ZTY5NjViNDMzOTNkN2RlMTdkOWNiZjg0YjQ5MTAwMjUzOGRkOWRhZjM4YWVjODc4MDFmZjE3MWUyMmUyOWYyMjgwZmVlN2U4MGFlMzI3ZTJkY2E0YTYxOWMxNTNkZjk5NzRkYjk3OWMxMDA1MWIwMjc1NWNlOTkwNDQxMWM1ODUxYWNlNTJiNTAxMjEwNDI2YTMxNTFiMDdiYmI5MzY4ZjhlZjVlY2NjZTBhZGY3ZGQ5YzliMTE2Y2RiMmY3ODMwMGYxZTc4N2VjNDYxNmJlMDQ2MzZiZWU1N2RjOTU2YjE1ZTMyMDA3Yzg5OWM5ZmYwNjY3OWQwMjQ3YWFhN2MzMWJmY2E1MjUwMzkyYTFhN2MwMWNjODA3M2UwMmYxNjk1MDg0NzE4ZWFlMTE3ODQ1ZjMyNzc0NzA3NDIwYzI3NzZmM2VjMTRjZTVkMTI3OTM5N2VhMWZhMzNhNjlmMWFhZDMzNTNmYjgyY2NjMWM4ODJiMTg0ZWI3NjY3MGIzNTljNzljNzhhZjUzNDI0YjQ4YzQ3MWMzN2RmNTAzMzg3ODUwODk5ODJkNTFmZGYwMzQ4NWU3YWRmNmY5NTdkOTVlNmYxYjYzMGExYWZhMWZiOTRlZjM1ZDZmNjNkMjVjZDVkMTM4NzNhOThlNzNhYWFjYzc1YzNiZWZhMDZmNjg3YTJhOWQ4YmI4Mzk1MGMxNWFjMDg4ZThmYTM1NjVmOWU2MjZi`

const apiUrl = `https://api.sledge-app.com/app/settings${urlQuery}`
const cloudflareUrl = `https://sledge-edge.devanramadhan92.workers.dev/app/settings${urlQuery}`

const fetchData = async ( url ) => {
  const start = Date.now()
  const response = await fetch(url)
  console.log('status', response.json());

  const end = (Date.now() - start)
  
  return end 
}

const startBenchmark = async () => {

    console.clear()
    console.log("Starting benchmark")
    
    console.table([
        {
            "Name": "fetchWithoutCloudflare",
            "Latency Call": "First",
            "Time": await fetchData(apiUrl)
        },
        {
            "Name": "fetchWithoutCloudflare",
            "Latency Call": "Second",
            "Time": await fetchData(apiUrl)
        },
        {
            "Name": "fetchWithCloudflare",
            "Latency Call": "First",
            "Time": await fetchData(cloudflareUrl)
        },
        {
            "Name": "fetchWithCloudflare",
            "Latency Call": "Second",
            "Time": await fetchData(cloudflareUrl)
        }
    ])
}

startBenchmark()