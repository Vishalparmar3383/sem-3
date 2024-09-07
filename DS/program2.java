import java.util.Scanner;

public class program2 {
    public static void main(String[] args) {
        Scanner scanner= new Scanner(System.in);
        System.out.println("Please enter a number");
        int n= scanner.nextInt();

        if(n%2==0){
            System.out.println("Number is even");   
        }
        else{
            System.out.println("Number is odd");
        }


    }
    
}
