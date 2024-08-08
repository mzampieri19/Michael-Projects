import java.time.*; 

public class dateTest {
    private int year = 2023; 
    private int month = 12;
    private int day = 31;

    public dateTest() {
        LocalDate date = LocalDate.of(year, month, day);
        System.out.println(date);
    }
}
