create-volumes:
	docker volume create --name=dinsights_volume

remove-volumes:
	docker rm dinsights_volume

docker-compose:
	docker-compose up
