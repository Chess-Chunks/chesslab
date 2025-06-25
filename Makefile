docker-build-all:
	docker build -t chesslab-frontend -f ./frontend/Dockerfile ./frontend
	docker build -t chesslab-backend -f ./backend/Dockerfile ./backend

docker-run-all:
	docker run -d  \
	--name vite-client \
	--network chesslab-network \
	-p 8080:8080 \
	--restart unless-stopped \
	chesslab-frontend

	docker run -d  \
	--name fastapi-server \
	--network chesslab-network \
	-p 8000:8000 \
	--restart unless-stopped \
	chesslab-backend

