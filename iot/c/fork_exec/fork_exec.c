#include <unistd.h>
#include <stdio.h>
#include <stdlib.h>

int main(int argc, char **argv) {

	int pid;
	int result;
	char *path;
	
	pid = fork();
	if(pid == 0) {
		path = getenv("PATH");
		if(path != NULL) {
			printf("Path: %s\n",path);
		} else {
			printf("Path not defined\n");
		}
		argv[0] = "exec-test";
		result = execvp("ls",argv);
		printf("Should not be here %d\n",result);
		return 1;			
	} else {
		printf("Parent here, exiting!\n");
		return 0;
	}
}
