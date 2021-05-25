#include <stdio.h>
#include <stdlib.h>

int main(int argc, char **argv) {
	
	int num;
	FILE *fptr;
	
	if((fptr = fopen("numbers.txt","r")) == NULL) {
		printf("Failed to open file. Exiting \n");
		return 1;
	}
	
	fscanf(fptr,"%d",&num);
	
	printf("Read number %d from file\n",num);
	
	fclose(fptr);
	
	return 0;
	
}
