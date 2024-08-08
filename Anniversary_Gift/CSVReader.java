import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;

public class CSVReader {
    private File file;
    private BufferedReader reader;
    private String delimiter;

    public CSVReader(File file) throws IOException {
        this.file = file;
        this.reader = new BufferedReader(new FileReader(file));
        this.delimiter = ",";
    }

    public CSVReader(File file, String delimiter) throws IOException {
        this.file = file;
        this.reader = new BufferedReader(new FileReader(file));
        this.delimiter = delimiter;
    }

    public String[] readNext() throws IOException {
        String line = reader.readLine();
        if (line == null) {
            return null;
        }
        return line.split(delimiter);
    }

    public void close() throws IOException {
        reader.close();
    }
}
