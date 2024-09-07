import java.util.Scanner;

public class program3 {
    public static void main(String[] args) {
        Scanner scanner= new Scanner(System.in);
        System.out.println("Please enter a character");

        String c= scanner.next();

        if(c=="a"||c=="e"||c=="i"||c=="o"||c=="u"||c=="A"||c=="E"||c=="I"||c=="O"||c=="U"){
            System.out.println("Character is a vowel");
        }
        else{
            System.out.println("Character is a consonant");
        }
    }
    
}
