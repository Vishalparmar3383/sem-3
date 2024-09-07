import java.util.Scanner;

public class program5 {
    public static void main(String[] args) {
        Scanner scanner= new Scanner(System.in);
        System.out.println("Please enter a number");
        double n= scanner.nextDouble();
        double ans= fact(n);
        System.out.println("Ans is="+ans);
    }
    public static double fact(double n){
        if(n==1){
            return 1;
        }
        else{
            return n*fact(n-1);
        }
    }
    
}
