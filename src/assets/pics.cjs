const jsonProducts = require("./products.json")

const getPics = async (word) => {
	const uri = `https://www.freepik.com/search?format=search&query=${encodeURI(word)}`
	const headers = {
		"User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/112.0",
	}
	const response = await fetch(uri, { headers })
	const responseText = await response.text()
	const responseArray = responseText.split(/\r\n|\r|\n/, -1)

	const imgs = []
	let count = 0

	responseArray.forEach((line, index) => {
		if (count > 2) return
		if (line.includes("data-image")) {
			if (line.includes("?")) {
				const heigth = parseInt(
					responseArray[index - 2].slice(responseArray[index - 2].indexOf("data-h=") + 8, -1)
				)
				const width = parseInt(
					responseArray[index - 3].slice(responseArray[index - 3].indexOf("data-w=") + 8, -1)
				)

				if (heigth > width / 2 && width > heigth) {
					imgs.push(line.slice(line.indexOf("data-image") + 12, line.indexOf("?")))
					count++
				}
			}
		}
	})

	return imgs
}

const main = async () => {
	for (let product of jsonProducts) {
		const pics = await getPics(product.name)
		product.images[0].url = pics[0]
		product.images[1].url = pics[1]
		product.images[2].url = pics[2]
	}
	console.log(JSON.stringify(jsonProducts))
}

main()
