#include <stdio.h>
#include <stdlib.h>

int main(int argc, char **argv) {

	int num;
	FILE *fptr;
	
	fptr = fopen("numbers.txt","w");
	if(fptr == NULL) {
		printf("Failed to open file. Exiting \n");
		return 1;
	}
	printf("Give me a number\n");
	scanf("%d",&num);
	
	fprintf(fptr, "%d", num);
	fclose(fptr);
	return 0;
}
