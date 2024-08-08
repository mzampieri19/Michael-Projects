import java.io.File;
import java.io.IOException;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;
import java.util.PriorityQueue;

class MainClass {
    private static final String emo_regex = "([\\u20a0-\\u32ff\\ud83c\\udc00-\\ud83d\\udeff\\udbb9\\udce5-\\udbb9\\udcee])";
    public static void main(String[] args) throws IOException {
        File file = new File("test.csv");
        CSVReader reader = new CSVReader(file);

        if (file.exists()) {
            System.out.println("File exists");
            String[] messages = parseMessages(reader, file); // Add semicolon here
            filterContent(messages);
            filterSender(messages);
            //printMessages(messages);
            System.out.println("File read successfully");
            System.out.println("\n");
            SenderRatio(messages);
            System.out.println("\n");
            fiveMostCommonWords(messages);
            System.out.println("\n");
            fiveMostCommonEmojis(messages);
            System.out.println("\n");
            mostCommonPhrase(messages);
            System.out.println("\n");
            mostCommonDay(messages);
            System.out.println("\n");
            WeekDayRatio(messages);
            System.out.println("\n");
            LoveYouCount(messages);

            
        } else {
            System.out.println("File does not exist");
        }

        reader.close();
    }

    private static void LoveYouCount(String[] messages) {
        System.out.println("Finding Love You Count");
        int loveYouCount = 0;
        for (String message : messages) {
            if (message != null) {
                String[] parts = message.split("\\|");
                String content = parts[2].trim();
                if (content.toLowerCase().contains("love you")) {
                    loveYouCount++;
                }
            }
        }
        System.out.println("Love You Count: " + loveYouCount);
    }

    private static void WeekDayRatio(String[] messages) {
        System.out.println("Finding Day of Week Ratio");
        HashMap<String, Integer> dayCount = new HashMap<>();
        for (String message : messages) {
            if (message != null) {
                String[] parts = message.split("\\|");
                String date = parts[1].trim();
                String[] dateParts = date.split("\\-");
                String month = dateParts[1];
                String day = dateParts[2];
                day = day.split(" ")[0];
                String year = dateParts[0];

                LocalDate localDate = LocalDate.of(Integer.parseInt(year), Integer.parseInt(month), Integer.parseInt(day));
                String dayOfWeek = localDate.getDayOfWeek().toString();
                if (dayCount.containsKey(dayOfWeek)) {
                    dayCount.put(dayOfWeek, dayCount.get(dayOfWeek) + 1);
                } else {
                    dayCount.put(dayOfWeek, 1);
                }
            }
        }

        PriorityQueue<Map.Entry<String, Integer>> pq = new PriorityQueue<>((a, b) -> b.getValue() - a.getValue());
        pq.addAll(dayCount.entrySet());

        while (!pq.isEmpty()) {
            Map.Entry<String, Integer> entry = pq.poll();
            System.out.println("Day: " + entry.getKey() + " Count: " + entry.getValue());
        }
    }

    private static void mostCommonDay(String[] messages) {
        System.out.println("Finding most common day");
        HashMap<String, Integer> dayCount = new HashMap<>();
        for (String message : messages) {
            if (message != null) {
                String[] parts = message.split("\\|");
                String date = parts[1].trim();
                String[] dateParts = date.split(" ");
                String day = dateParts[0];
                if (dayCount.containsKey(day)) {
                    dayCount.put(day, dayCount.get(day) + 1);
                } else {
                    dayCount.put(day, 1);
                }
            }
        }

        PriorityQueue<Map.Entry<String, Integer>> pq = new PriorityQueue<>((a, b) -> b.getValue() - a.getValue());
        pq.addAll(dayCount.entrySet());

        int count = 0;
        while (!pq.isEmpty() && count < 1) {
            Map.Entry<String, Integer> entry = pq.poll();
            System.out.println("Most texts in a day: " + entry.getKey() + " texts: " + entry.getValue());
            count++;
        }
    }

    private static void mostCommonPhrase(String[] messages) {
        System.out.println("Finding most common phrase");
        HashMap<String, Integer> phraseCount = new HashMap<>();
        for (String message : messages) {
            if (message != null) {
                String[] parts = message.split("\\|");
                String content = parts[2].trim();
                String[] words = content.split(" ");
                for (int i = 0; i < words.length - 1; i++) {
                    String phrase = words[i] + " " + words[i + 1];
                    if (phraseCount.containsKey(phrase)) {
                        phraseCount.put(phrase, phraseCount.get(phrase) + 1);
                    } else {
                        phraseCount.put(phrase, 1);
                    }
                }
            }
        }

        PriorityQueue<Map.Entry<String, Integer>> pq = new PriorityQueue<>((a, b) -> b.getValue() - a.getValue());
        pq.addAll(phraseCount.entrySet());

        int count = 0;
        while (!pq.isEmpty() && count < 1) {
            Map.Entry<String, Integer> entry = pq.poll();
            System.out.println("Most Common Phrase: " + entry.getKey() + " appears " + entry.getValue());
            count++;
        }
    }

    private static void fiveMostCommonEmojis(String[] messages) {
        System.out.println("Finding five most common emojis");
        HashMap<String, Integer> emojiCount = new HashMap<>();
        for (String message : messages) {
            if (message != null) {
                String[] parts = message.split("\\|");
                String content = parts[2].trim();
                String[] words = content.split(" ");
                for (String word : words) {
                    if (word.matches(emo_regex)) {
                        if (emojiCount.containsKey(word)) {
                            emojiCount.put(word, emojiCount.get(word) + 1);
                        } else {
                            emojiCount.put(word, 1);
                        }
                    }
                }
            }
        }

        PriorityQueue<Map.Entry<String, Integer>> pq = new PriorityQueue<>((a, b) -> b.getValue() - a.getValue());
        pq.addAll(emojiCount.entrySet());

        int count = 0;
        while (!pq.isEmpty() && count < 5) {
            Map.Entry<String, Integer> entry = pq.poll();
            int rank = count + 1;
            String ordinal = getOrdinal(rank);
            System.out.println(ordinal + ": " + entry.getKey() + ": appears " + entry.getValue());
            count++;
        }
    }

    private static void fiveMostCommonWords(String[] messages) {
        System.out.println("Finding five most common words");
        HashMap<String, Integer> wordCount = new HashMap<>();
        for (String message : messages) {
            if (message != null) {
                String[] parts = message.split("\\|");
                String content = parts[2].trim();
                String[] words = content.split(" ");
                for (String word : words) {
                    word = word.toLowerCase();
                    if (word.length() > 4 && !word.contains("'")) {
                        if (wordCount.containsKey(word)) {
                            wordCount.put(word, wordCount.get(word) + 1);
                        } else {
                            wordCount.put(word, 1);
                        }
                    }
                }
            }
        }

        PriorityQueue<Map.Entry<String, Integer>> pq = new PriorityQueue<>((a, b) -> b.getValue() - a.getValue());
        pq.addAll(wordCount.entrySet());

        int count = 0;
        while (!pq.isEmpty() && count < 5) {
            Map.Entry<String, Integer> entry = pq.poll();
            int rank = count + 1;
            String ordinal = getOrdinal(rank);
            System.out.println(ordinal + ": " + entry.getKey() + ": appears " + entry.getValue());
            count++;
        }
    }

    private static String getOrdinal(int rank) {
        if (rank == 1) {
            return "1st";
        } else if (rank == 2) {
            return "2nd";
        } else if (rank == 3) {
            return "3rd";
        } else {
            return rank + "th";
        }
    }

    private static void SenderRatio(String[] messages) {
        System.out.println("Finding Sender Ratio");
        int incomingMessages = 0;
        int outgoingMessages = 0;
        for (String message : messages) {
            if (message != null) {
                String[] parts = message.split("\\|");
                String sender = parts[0].trim();
                if (sender.equals("Leilyz")) {
                    incomingMessages++;
                } else if (sender.equals("Michael")) {
                    outgoingMessages++;
                }
            }
        }
        int totalMessages = incomingMessages + outgoingMessages;
        System.out.println("Leilyz messages: " + incomingMessages);
        System.out.println("Michael messages: " + outgoingMessages);

        double leilyzMessageRatio = (double) incomingMessages / totalMessages;
        double leilyzMessagePercentage = leilyzMessageRatio * 100;
        double roundedLeilyzMessagePercentage = Math.round(leilyzMessagePercentage * 10.0) / 10.0;
        System.out.println("Leilyz message ratio: " + roundedLeilyzMessagePercentage + "%");

        double michaelMessageRatio = (double) outgoingMessages / totalMessages;
        double michaelMessagePercentage = michaelMessageRatio * 100;
        double roundedMichaelMessagePercentage = Math.round(michaelMessagePercentage * 10.0) / 10.0;
        System.out.println("Michael message ratio: " + roundedMichaelMessagePercentage + "%");
     }

    private static void filterSender(String[] messages) {
        System.out.println("Filtering senders");
        for (int i = 0; i < messages.length; i++) {
            if (messages[i] != null) {
                String[] parts = messages[i].split("\\|");
                String sender = parts[0].trim();
                if (sender.equals("Incoming")) {
                    parts[0] = "Leilyz";
                } else if (sender.equals("Outgoing")) {
                    parts[0] = "Michael";
                }
                messages[i] = String.join(" | ", parts);
            }
        }
    }

    private static void filterContent(String[] messages) {
        System.out.println("Filtering messages");
        for (int i = 0; i < messages.length; i++) {
            if (messages[i] != null) {
                String[] parts = messages[i].split("\\|");
                String content = parts[2].trim();
                if (content.equals("") || content.equals("null")) {
                    messages[i] = null;
                }
            }
        } 
    }

    private static String[] parseMessages(CSVReader reader, File file) {
        System.out.println("Parsing messages");
        String[] messages = new String[200000000];
        String[] nextLine;
        int index = 0;
        try {
            while ((nextLine = reader.readNext()) != null) {
                if (nextLine.length >= 13) {
                    String sender = nextLine[6];
                    String date = nextLine[1];
                    String content = nextLine[12];
                    if (content != null) {
                        messages[index++] = sender + " | " + date + " | " + content;
                    }
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return messages;
    }
       
    private static void printMessages(String[] messages) {
        System.out.println("Printing messages");
        System.out.println("sender " + "date " + " content");
        for (String message : messages) {
            if (message != null) {
                System.out.println(message);
            }
        }
    }

}