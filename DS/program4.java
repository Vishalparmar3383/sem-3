import java.util.Scanner;

public class program4 {
    public static void main(String[] args) {
        Scanner scanner= new Scanner(System.in);
        System.out.println("Please enter a number ");
        int n=scanner.nextInt();
        int i=1;

        for(i=1; i<=n; i++){
            n=n*i;
        }
        System.out.println("factorial of a given number"+n);

    }
    
}
