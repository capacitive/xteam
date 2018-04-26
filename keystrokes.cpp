
#include <stdio.h>
#include <stdlib.h>
#include <sys/time.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <unistd.h>
#include <fcntl.h>
#include <termios.h>
#include <linux/input.h>

int main(int argc, char **argv)
{
    int fd;
    if(argc < 2) {
        printf("usage: %s <device>\n", argv[0]);
        return 1;
    }
    fd = open(argv[1], O_RDONLY);
    struct input_event ev;

    while (1) {
      read(fd, &ev, sizeof(struct input_event));
    }

    if(ev.type == 1) {
      printf("key %i state %i\n", ev.code, ev.value);
    }

    return 0;
}

int capture() {
  struct termios oldSettings, newSettings;

  tcgetattr( fileno( stdin ), &oldSettings );
  newSettings = oldSettings;
  newSettings.c_lflag &= (~ICANON & ~ECHO);
  tcsetattr( fileno( stdin ), TCSANOW, &newSettings );    
  
  while ( 1 ) {
      fd_set set;
      struct timeval tv;

      tv.tv_sec = 10;
      tv.tv_usec = 0;

      FD_ZERO( &set );
      FD_SET( fileno( stdin ), &set );

      int res = select( fileno( stdin )+1, &set, NULL, NULL, &tv );

      if( res > 0 )
      {
          char c;
          printf( "Input available\n" );
          read(fileno( stdin ), &c, 1 );
          switch(c) {
            case 's':
              tcsetattr( fileno( stdin ), TCSANOW, &oldSettings );
              return 1;
            break;
          }
          printf("%c", c);
      }
      else if( res < 0 )
      {
          perror( "select error" );
          break;
      }
      else
      {
          printf( "Select timeout\n" );
      }
  }

  tcsetattr( fileno( stdin ), TCSANOW, &oldSettings );
  return 0;
}

int main2(){
    int response = capture();
    switch(response) {
      case 1:
      printf("You pressed the target key...");
      printf("\n");
      break;
    }

    return 0;
}