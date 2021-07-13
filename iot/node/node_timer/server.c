#include <stdio.h>
#include <stdlib.h>
#include <sys/socket.h>
#include <sys/types.h>
#include <netinet/in.h>
#include <string.h>
#include <errno.h>
#include <unistd.h>
#include <pthread.h>

void *client_handler(void *arg) {
	int sock = *((int *)arg);
	int no_of_bytes,timer;
	char buffer[256];
	timer = 0;
	while(1) {
		memset(buffer,0,256);
		sprintf(buffer,"%d\n",timer);
		no_of_bytes = write(sock,buffer,strlen(buffer));
		if(no_of_bytes == 0) {
			return NULL;
		}
		timer++;
		sleep(1);		
	}
	close(sock);
	return NULL;		
}

int main(int argc, char **argv) {
	int sock, newsock, portno, clilength;
	struct sockaddr_in server_address,client_address;
	pthread_t handler_thread;
	
	if(argc < 2) {
		printf("Please provide a port\n");
		printf("For example: server 5000\n");
		return 1;
	}
	
	portno = atoi(argv[1]);
	sock = socket(AF_INET,SOCK_STREAM,0);
	memset((char *)&server_address,0,sizeof(struct sockaddr_in));
	
	server_address.sin_family = AF_INET;
	server_address.sin_port = htons(portno);
	server_address.sin_addr.s_addr = INADDR_ANY;
	

	if(bind(sock,(struct sockaddr *)&server_address,sizeof(server_address)) < 0) {
		printf("Error binding socket: %s\n",strerror(errno));
		return 1;
	}
	
	listen(sock,5);
	clilength = sizeof(client_address);
	printf("Now accepting connections in port:%d\n",portno);
	while(1) {	
		newsock = accept(sock,(struct sockaddr *)&client_address,(socklen_t *)&clilength);
		if(newsock < 0) {
			printf("Error acception connection: %s\n",strerror(errno));
			return 1;
		}
		if(pthread_create(&handler_thread,NULL,&client_handler,(void *)&newsock) <0) {
			printf("Failed to create new thread");
			close(newsock);
		}
		pthread_detach(handler_thread);
	}
	close(sock);
	return 0;
}
