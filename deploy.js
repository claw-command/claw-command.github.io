//hope this workd
import ghpages from 'gh-pages';

ghpages.publish('dist', { cname: 'clawcmd.com' }, (err) => {
  if (err) {
    console.error('Deploy failed:', err);
    process.exit(1);
  }
  console.log('Deployed successfully with custom domain!');
});
