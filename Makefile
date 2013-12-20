app: compile
	node app.js
bootstrap: compile
	node bootstrap.js
compile:
	coffee -c routes/coffee.coffee
clean:
	rm coffee.js
