CC=go
CC_FLAGS=build

backend_app: app.go email_service.go db_service.go
	$(CC) $(CC_FLAGS) -o $(@) $(^)

clean:
	rm -f backend_app
	clear
	clear
