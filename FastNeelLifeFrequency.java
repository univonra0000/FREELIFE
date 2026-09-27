// Optional Core Java companion demonstrating the same frequency-session data model.
// This file is not required to run the browser app.
public class FastNeelLifeFrequency {
    public static class Session {
        public final String target;
        public final double hz;
        public final int minutes;
        public Session(String target, double hz, int minutes) {
            this.target = target; this.hz = hz; this.minutes = minutes;
        }
        @Override public String toString() {
            return target + " | " + hz + " Hz | " + minutes + " min";
        }
    }
    public static void main(String[] args) {
        Session s = new Session("Full Body Relaxation", 432, 10);
        System.out.println("FastNeelLife: " + s);
    }
}
